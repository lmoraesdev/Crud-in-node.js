const express = require('express')
const routes = require('./routes')

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
