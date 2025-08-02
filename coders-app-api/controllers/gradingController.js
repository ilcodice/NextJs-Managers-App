exports.submitCode = (req, res) => {
    const { lang, code, challenge_id } = req.body;
    res.json({
      message: 'Submission received',
      lang,
      challenge_id,
      code
    });
  };
  