module.exports = {
  default: {
    paths: ['tests/features/done/**/*.feature'],
    require: ['tests/features/step_definitions/**/*.js'],
    format: ['progress', 'html:tests/features/cucumber-report.html'],
  },
};
