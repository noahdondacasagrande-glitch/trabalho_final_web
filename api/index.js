
export default {
  fetch(request) {
    return new Response(
      JSON.stringify({
        mensagem: "API disponível na Vercel!"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
