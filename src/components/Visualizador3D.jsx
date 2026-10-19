
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { ThreeMFLoader } from "three/addons/loaders/3MFLoader.js";

// Fatores de conversão para milímetros.
const FATOR_PARA_MM = {
    mm: 1,
    cm: 10,
    m: 1000
};

function Visualizador3D({ arquivo }) {
    const areaRef = useRef(null);

    const [informacoes, setInformacoes] = useState(null);
    const [unidade, setUnidade] = useState("mm");
    const [erro, setErro] = useState("");

    useEffect(() => {
        const area = areaRef.current;

        if (!area) return;

        let cancelado = false;
        let animationId;

        const cena = new THREE.Scene();
        cena.background = new THREE.Color(0xf1f3f5);

        const camera = new THREE.PerspectiveCamera(
            45,
            area.clientWidth / Math.max(area.clientHeight, 1),
            0.01,
            1000000
        );

        camera.position.set(100, 100, 150);

        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        renderer.setSize(
            area.clientWidth,
            area.clientHeight
        );

        area.replaceChildren(renderer.domElement);

        cena.add(
            new THREE.HemisphereLight(
                0xffffff,
                0x666666,
                2
            )
        );

        const luz = new THREE.DirectionalLight(
            0xffffff,
            2
        );

        luz.position.set(100, 200, 150);
        cena.add(luz);

        const controles = new OrbitControls(
            camera,
            renderer.domElement
        );

        controles.enableDamping = true;

        const grade = new THREE.GridHelper(
            200,
            20,
            0x888888,
            0xcccccc
        );

        cena.add(grade);

        // Remove triângulos sem área do STL.
        // Isso não altera a escala da geometria válida.
        function limparGeometriaSTL(geometriaOriginal) {
            const posicoes =
                geometriaOriginal.getAttribute("position");

            if (!posicoes || posicoes.count < 3) {
                geometriaOriginal.dispose();

                throw new Error(
                    "O arquivo STL não contém vértices suficientes."
                );
            }

            const verticesValidos = [];

            const a = new THREE.Vector3();
            const b = new THREE.Vector3();
            const c = new THREE.Vector3();

            const ab = new THREE.Vector3();
            const ac = new THREE.Vector3();
            const cruzado = new THREE.Vector3();

            for (
                let i = 0;
                i + 2 < posicoes.count;
                i += 3
            ) {
                a.fromBufferAttribute(posicoes, i);
                b.fromBufferAttribute(posicoes, i + 1);
                c.fromBufferAttribute(posicoes, i + 2);

                // Descarta triângulos com coordenadas inválidas.
                const coordenadasValidas = [
                    a.x, a.y, a.z,
                    b.x, b.y, b.z,
                    c.x, c.y, c.z
                ].every(Number.isFinite);

                if (!coordenadasValidas) {
                    continue;
                }

                ab.subVectors(b, a);
                ac.subVectors(c, a);
                cruzado.crossVectors(ab, ac);

                const areaDobrada = cruzado.length();

                // Triângulos sem área não formam uma superfície.
                if (
                    !Number.isFinite(areaDobrada) ||
                    areaDobrada <= 1e-10
                ) {
                    continue;
                }

                verticesValidos.push(
                    a.x, a.y, a.z,
                    b.x, b.y, b.z,
                    c.x, c.y, c.z
                );
            }

            geometriaOriginal.dispose();

            if (verticesValidos.length === 0) {
                throw new Error(
                    "O arquivo STL não contém triângulos válidos."
                );
            }

            const geometria = new THREE.BufferGeometry();

            geometria.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(
                    verticesValidos,
                    3
                )
            );

            geometria.computeVertexNormals();

            return geometria;
        }

        // Calcula o volume geométrico da malha.
        function calcularVolume(raiz) {
            let volumeTotal = 0;
            let encontrouMalha = false;

            raiz.updateMatrixWorld(true);

            raiz.traverse((objeto) => {
                if (
                    !objeto.isMesh ||
                    !objeto.geometry
                ) {
                    return;
                }

                const geometria = objeto.geometry;
                const posicoes =
                    geometria.getAttribute("position");

                if (!posicoes || posicoes.count < 3) {
                    return;
                }

                const indice = geometria.index;
                const matriz = objeto.matrixWorld;

                let volumeAssinado = 0;

                const a = new THREE.Vector3();
                const b = new THREE.Vector3();
                const c = new THREE.Vector3();

                const cruzado = new THREE.Vector3();

                const triCount = indice
                    ? Math.floor(indice.count / 3)
                    : Math.floor(posicoes.count / 3);

                for (let i = 0; i < triCount; i++) {
                    const ia = indice
                        ? indice.getX(i * 3)
                        : i * 3;

                    const ib = indice
                        ? indice.getX(i * 3 + 1)
                        : i * 3 + 1;

                    const ic = indice
                        ? indice.getX(i * 3 + 2)
                        : i * 3 + 2;

                    a.fromBufferAttribute(posicoes, ia)
                        .applyMatrix4(matriz);

                    b.fromBufferAttribute(posicoes, ib)
                        .applyMatrix4(matriz);

                    c.fromBufferAttribute(posicoes, ic)
                        .applyMatrix4(matriz);

                    cruzado.crossVectors(b, c);

                    volumeAssinado +=
                        a.dot(cruzado) / 6;
                }

                if (Number.isFinite(volumeAssinado)) {
                    volumeTotal += Math.abs(volumeAssinado);
                    encontrouMalha = true;
                }
            });

            return encontrouMalha
                ? volumeTotal
                : null;
        }

        async function carregarModelo() {
            if (!arquivo) {
                setErro("");
                setInformacoes(null);
                return;
            }

            let objeto;

            try {
                setErro("");
                setInformacoes(null);

                const extensao = arquivo.name
                    .split(".")
                    .pop()
                    .toLowerCase();

                const buffer = await arquivo.arrayBuffer();

                if (cancelado) return;

                // Carregamento de arquivos STL.
                if (extensao === "stl") {
                    const geometriaOriginal =
                        new STLLoader().parse(buffer);

                    const geometria =
                        limparGeometriaSTL(geometriaOriginal);

                    const material =
                        new THREE.MeshStandardMaterial({
                            color: 0x4b82c3,
                            metalness: 0.15,
                            roughness: 0.55
                        });

                    objeto = new THREE.Mesh(
                        geometria,
                        material
                    );

                // Carregamento de arquivos OBJ.
                } else if (extensao === "obj") {
                    const texto =
                        new TextDecoder().decode(buffer);

                    objeto = new OBJLoader().parse(texto);

                    objeto.traverse((item) => {
                        if (item.isMesh) {
                            item.material =
                                new THREE.MeshStandardMaterial({
                                    color: 0x4b82c3,
                                    metalness: 0.1,
                                    roughness: 0.65
                                });
                        }
                    });

                // Carregamento de arquivos 3MF.
                } else if (extensao === "3mf") {
                    objeto = new ThreeMFLoader().parse(buffer);

                } else {
                    throw new Error(
                        "Formato não suportado. Utilize STL, OBJ ou 3MF."
                    );
                }

                if (cancelado) {
                    objeto.traverse((item) => {
                        if (item.geometry) {
                            item.geometry.dispose();
                        }

                        if (item.material) {
                            const materiais = Array.isArray(
                                item.material
                            )
                                ? item.material
                                : [item.material];

                            materiais.forEach((material) => {
                                material.dispose();
                            });
                        }
                    });

                    return;
                }

                objeto.updateMatrixWorld(true);

                // Mede a extensão da geometria válida.
                const caixa = new THREE.Box3()
                    .setFromObject(objeto);

                if (caixa.isEmpty()) {
                    throw new Error(
                        "O arquivo não contém uma geometria válida."
                    );
                }

                const tamanho = caixa.getSize(
                    new THREE.Vector3()
                );

                const centro = caixa.getCenter(
                    new THREE.Vector3()
                );

                // Centraliza o modelo sem alterar sua escala.
                objeto.position.sub(centro);

                cena.add(objeto);

                const maiorDimensao = Math.max(
                    tamanho.x,
                    tamanho.y,
                    tamanho.z,
                    1
                );

                // Enquadra o objeto na câmera.
                camera.position.set(
                    maiorDimensao * 1.5,
                    maiorDimensao * 1.2,
                    maiorDimensao * 1.8
                );

                camera.near = Math.max(
                    maiorDimensao / 10000,
                    0.01
                );

                camera.far = maiorDimensao * 100;

                camera.updateProjectionMatrix();

                controles.target.set(0, 0, 0);
                controles.update();

                grade.scale.setScalar(
                    maiorDimensao / 200
                );

                grade.position.y = -tamanho.y / 2;

                const volume = calcularVolume(objeto);

                // Mantém as medidas geométricas originais.
                // O seletor não modifica o modelo 3D.
                setInformacoes({
                    x: tamanho.x,
                    y: tamanho.y,
                    z: tamanho.z,
                    volume
                });

            } catch (e) {
                if (!cancelado) {
                    setErro(
                        `Não foi possível ler o modelo: ${e.message}`
                    );
                }

                if (objeto && !cena.children.includes(objeto)) {
                    objeto.traverse((item) => {
                        if (item.geometry) {
                            item.geometry.dispose();
                        }

                        if (item.material) {
                            const materiais = Array.isArray(
                                item.material
                            )
                                ? item.material
                                : [item.material];

                            materiais.forEach((material) => {
                                material.dispose();
                            });
                        }
                    });
                }
            }
        }

        function redimensionar() {
            if (
                !area.clientWidth ||
                !area.clientHeight
            ) {
                return;
            }

            camera.aspect =
                area.clientWidth / area.clientHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                area.clientWidth,
                area.clientHeight
            );
        }

        function animar() {
            if (cancelado) return;

            animationId = requestAnimationFrame(animar);

            controles.update();
            renderer.render(cena, camera);
        }

        const observador = new ResizeObserver(redimensionar);

        observador.observe(area);

        carregarModelo();
        animar();

        return () => {
            cancelado = true;

            cancelAnimationFrame(animationId);
            observador.disconnect();
            controles.dispose();

            cena.traverse((objeto) => {
                if (objeto.geometry) {
                    objeto.geometry.dispose();
                }

                if (objeto.material) {
                    const materiais = Array.isArray(
                        objeto.material
                    )
                        ? objeto.material
                        : [objeto.material];

                    materiais.forEach((material) => {
                        material.dispose();
                    });
                }
            });

            renderer.dispose();
            renderer.domElement.remove();
        };
    }, [arquivo]);

    // Fator que indica quantos milímetros existem
    // em cada unidade selecionada.
    const fator = FATOR_PARA_MM[unidade];

    // Conversão das dimensões para a unidade escolhida.
    const largura = informacoes
        ? informacoes.x / fator
        : 0;

    const altura = informacoes
        ? informacoes.y / fator
        : 0;

    const profundidade = informacoes
        ? informacoes.z / fator
        : 0;

    // Conversão cúbica do volume.
    const volumeConvertido =
        informacoes?.volume != null
            ? informacoes.volume / (fator ** 3)
            : null;

    return (
        <section>
            <h2>Visualização do modelo 3D</h2>

            <div
                ref={areaRef}
                style={{
                    width: "100%",
                    height: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}
            />

            {!arquivo && !erro && (
                <p>
                    Selecione um modelo STL, OBJ ou 3MF
                    para visualizar.
                </p>
            )}

            {erro && (
                <p role="alert">{erro}</p>
            )}

            {informacoes && (
                <div>
                    <h3>Medidas do modelo</h3>

                    <label htmlFor="unidade">
                        Unidade de exibição:
                    </label>

                    <select
                        id="unidade"
                        value={unidade}
                        onChange={(event) =>
                            setUnidade(event.target.value)
                        }
                    >
                        <option value="mm">
                            Milímetros (mm)
                        </option>

                        <option value="cm">
                            Centímetros (cm)
                        </option>

                        <option value="m">
                            Metros (m)
                        </option>
                    </select>

                    <p>
                        Largura X: {largura.toFixed(2)} {unidade}
                        {" "}(
                        {informacoes.x.toFixed(2)} mm)
                    </p>

                    <p>
                        Altura Y: {altura.toFixed(2)} {unidade}
                        {" "}(
                        {informacoes.y.toFixed(2)} mm)
                    </p>

                    <p>
                        Profundidade Z:{" "}
                        {profundidade.toFixed(2)} {unidade}
                        {" "}(
                        {informacoes.z.toFixed(2)} mm)
                    </p>

                    <p>
                        Volume geométrico estimado:{" "}

                        {volumeConvertido === null
                            ? "indisponível"
                            : `${volumeConvertido.toFixed(2)} ${unidade}³ (${informacoes.volume.toFixed(2)} mm³)`}
                    </p>

                    <small>
                        A conversão altera apenas a unidade
                        de exibição, não a escala do modelo.
                        Os valores são interpretados nas
                        unidades geométricas de origem como
                        milímetros. Arquivos STL não informam
                        necessariamente sua unidade original.
                        O volume estimado também depende da
                        integridade e do fechamento da malha.
                    </small>
                </div>
            )}
        </section>
    );
}

export default Visualizador3D;
