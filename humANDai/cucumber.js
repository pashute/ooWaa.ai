module.exports = {
  default: {
    requireModule: ['@babel/register'],
    require: ['features/step_definitions/**/*.js'],
    format: ['progress', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};
