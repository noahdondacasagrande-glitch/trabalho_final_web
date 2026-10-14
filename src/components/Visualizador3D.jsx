
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { ThreeMFLoader } from "three/addons/loaders/3MFLoader.js";

function Visualizador3D({ arquivo }) {
    const areaRef = useRef(null);
    const [informacoes, setInformacoes] = useState(null);
    const [unidade, setUnidade] = useState("mm");
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!arquivo || !areaRef.current) return;

        let cancelado = false;
        let animationId;
        let urlTemporaria;

        const area = areaRef.current;
        const cena = new THREE.Scene();
        cena.background = new THREE.Color(0xf1f3f5);

        const camera = new THREE.PerspectiveCamera(
            45,
            area.clientWidth / Math.max(area.clientHeight, 1),
            0.1,
            1000000
        );

        camera.position.set(100, 100, 150);

        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(area.clientWidth, area.clientHeight);
        area.replaceChildren(renderer.domElement);

        cena.add(new THREE.HemisphereLight(0xffffff, 0x666666, 2));

        const luz = new THREE.DirectionalLight(0xffffff, 2);
        luz.position.set(100, 200, 150);
        cena.add(luz);

        const controles = new OrbitControls(camera, renderer.domElement);
        controles.enableDamping = true;

        const grade = new THREE.GridHelper(200, 20, 0x888888, 0xcccccc);
        cena.add(grade);

        function calcularVolume(raiz) {
            let volumeTotal = 0;
            let encontrouMalha = false;

            raiz.updateMatrixWorld(true);

            raiz.traverse((objeto) => {
                if (!objeto.isMesh || !objeto.geometry) return;

                const geometria = objeto.geometry;
                const posicoes = geometria.getAttribute("position");

                if (!posicoes || posicoes.count < 3) return;

                const indice = geometria.index;
                const matriz = objeto.matrixWorld;

                let volumeAssinado = 0;
                const a = new THREE.Vector3();
                const b = new THREE.Vector3();
                const c = new THREE.Vector3();

                const triCount = indice
                    ? indice.count / 3
                    : posicoes.count / 3;

                for (let i = 0; i < triCount; i++) {
                    const ia = indice ? indice.getX(i * 3) : i * 3;
                    const ib = indice ? indice.getX(i * 3 + 1) : i * 3 + 1;
                    const ic = indice ? indice.getX(i * 3 + 2) : i * 3 + 2;

                    a.fromBufferAttribute(posicoes, ia).applyMatrix4(matriz);
                    b.fromBufferAttribute(posicoes, ib).applyMatrix4(matriz);
                    c.fromBufferAttribute(posicoes, ic).applyMatrix4(matriz);

                    volumeAssinado += a.dot(
                        new THREE.Vector3().crossVectors(b, c)
                    ) / 6;
                }

                volumeTotal += Math.abs(volumeAssinado);
                encontrouMalha = true;
            });

            return encontrouMalha ? volumeTotal : null;
        }

        async function carregarModelo() {
            try {
                setErro("");
                setInformacoes(null);

                const extensao = arquivo.name
                    .split(".")
                    .pop()
                    .toLowerCase();

                const buffer = await arquivo.arrayBuffer();
                let objeto;

                if (extensao === "stl") {
                    const geometria = new STLLoader().parse(buffer);

                    const material = new THREE.MeshStandardMaterial({
                        color: 0x4b82c3,
                        metalness: 0.15,
                        roughness: 0.55
                    });

                    objeto = new THREE.Mesh(geometria, material);
                } else if (extensao === "obj") {
                    const texto = new TextDecoder().decode(buffer);
                    objeto = new OBJLoader().parse(texto);

                    objeto.traverse((item) => {
                        if (item.isMesh) {
                            item.material = new THREE.MeshStandardMaterial({
                                color: 0x4b82c3,
                                metalness: 0.1,
                                roughness: 0.65
                            });
                        }
                    });
                } else if (extensao === "3mf") {
                    objeto = new ThreeMFLoader().parse(buffer);
                } else {
                    throw new Error("Formato não suportado.");
                }

                if (cancelado) return;

                objeto.updateMatrixWorld(true);

                const caixa = new THREE.Box3().setFromObject(objeto);

                if (caixa.isEmpty()) {
                    throw new Error("O arquivo não contém uma geometria válida.");
                }

                const tamanho = caixa.getSize(new THREE.Vector3());
                const centro = caixa.getCenter(new THREE.Vector3());

                objeto.position.sub(centro);
                cena.add(objeto);

                const maiorDimensao = Math.max(
                    tamanho.x,
                    tamanho.y,
                    tamanho.z,
                    1
                );

                camera.position.set(
                    maiorDimensao * 1.5,
                    maiorDimensao * 1.2,
                    maiorDimensao * 1.8
                );

                camera.near = Math.max(maiorDimensao / 10000, 0.01);
                camera.far = maiorDimensao * 100;
                camera.updateProjectionMatrix();

                controles.target.set(0, 0, 0);
                controles.update();

                grade.scale.setScalar(maiorDimensao / 200);
                grade.position.y = -tamanho.y / 2;

                const volume = calcularVolume(objeto);

                setInformacoes({
                    x: tamanho.x,
                    y: tamanho.y,
                    z: tamanho.z,
                    volume
                });
            } catch (e) {
                if (!cancelado) {
                    setErro(`Não foi possível ler o modelo: ${e.message}`);
                }
            }
        }

        function redimensionar() {
            if (!area.clientWidth || !area.clientHeight) return;

            camera.aspect = area.clientWidth / area.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(area.clientWidth, area.clientHeight);
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
            renderer.dispose();

            cena.traverse((objeto) => {
                if (objeto.geometry) objeto.geometry.dispose();

                if (objeto.material) {
                    const materiais = Array.isArray(objeto.material)
                        ? objeto.material
                        : [objeto.material];

                    materiais.forEach((material) => material.dispose());
                }
            });

            if (urlTemporaria) URL.revokeObjectURL(urlTemporaria);
            renderer.domElement.remove();
        };
    }, [arquivo]);

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

            {erro && <p role="alert">{erro}</p>}


            {informacoes && (
                <div>
                    <h3>Medidas do modelo</h3>

                    <label htmlFor="unidade">Unidade do arquivo:</label>

                    <select
                        id="unidade"
                        value={unidade}
                        onChange={(event) => setUnidade(event.target.value)}
                    >
                        <option value="mm">Milímetros (mm)</option>
                        <option value="cm">Centímetros (cm)</option>
                        <option value="m">Metros (m)</option>
                    </select>

                    <p>
                        Largura X: {(informacoes.x * (unidade === "mm" ? 1 : unidade === "cm" ? 0.1 : 0.001)).toFixed(2)} {unidade}
                    </p>

                    <p>
                        Altura Y: {(informacoes.y * (unidade === "mm" ? 1 : unidade === "cm" ? 0.1 : 0.001)).toFixed(2)} {unidade}
                    </p>

                    <p>
                        Profundidade Z: {(informacoes.z * (unidade === "mm" ? 1 : unidade === "cm" ? 0.1 : 0.001)).toFixed(2)} {unidade}
                    </p>

                    <p>
                        Volume geométrico estimado: {
                            (
                                informacoes.volume *
                                (unidade === "mm" ? 1 : unidade === "cm" ? 0.00001 : 0.000001)
                            ).toFixed(4)
                        } {unidade}³
                    </p>

                    <small>
                        Confirme a unidade original do modelo. STL não informa
                        necessariamente a unidade de medida.
                    </small>
                </div>
            )}

        </section>
    );
}

export default Visualizador3D;
