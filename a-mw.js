'use strict';

const path = require('path');
const express = require('express');
const Coverage = require('macaca-coverage');

const cwd = process.cwd();

const {
  collector,
  Reporter
} = Coverage({
  runtime: 'web'
});

module.exports = app => {
  const coveragePath = path.join(cwd);
  // app.use(express.static(coveragePath));
  app.get('/_coverage', function(req, res) {
    res.redirect('/coverage/' + req.query.pathname.split('/').join('_'));
  });
  app.use(express.json());
  app.post('/_coverage', function(req, res) {
    const __coverage__ = req.body;
    collector.add(__coverage__);

    const p = path.join(coveragePath, 'coverage', req.query.pathname.split('/').join('_'));
    const reporter = new Reporter(null, p);
    reporter.addAll([
      'html',
      'lcov',
      'json'
    ]);
    reporter.write(collector, true, () => {
      const coverageHtml = path.join(p, 'index.html');
      console.log(coverageHtml);
    });
    res.send(true);
  });
};
