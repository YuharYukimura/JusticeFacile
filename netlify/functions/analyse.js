exports.handler = async (event) => {

  try {

    const dossier = JSON.parse(event.body);

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-5",
          input: `
Tu es un juriste français.

Analyse le dossier suivant :

${JSON.stringify(dossier)}

Rédige un rapport simple avec :

- Résumé des faits
- Analyse juridique
- Points favorables
- Points défavorables
- Actions recommandées
`
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };

  }
};
