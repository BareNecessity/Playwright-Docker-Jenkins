pipeline {
  agent any

  environment {
    CI = 'true'
  }


  stages {
    stage('Navigate to Project') {
      steps {
        dir('workspace/playwright-project') {
          script {
            sh 'npm ci'
            sh 'npx playwright install --with-deps'
            sh 'npx playwright test'
            sh 'npx playwright show-report --output=playwright-report'
          }
        }
      }
    }

    stage('Publish HTML Report') {
      steps {
        publishHTML(target: [
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'workspace/playwright-project/playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
  }
}