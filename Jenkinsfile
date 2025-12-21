pipeline {
    agent {
        docker {
            image 'node:20'
            args '-u root:root'
        }
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "/ms-playwright"
        SLACK_WEBHOOK_URL = credentials('slack-webhook-token')
        EMAIL_RECIPIENTS = 'naveenanimation20@gmail.com,submit@naveenautomationlabs.com'
    }

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {

        stage('🔧 DEV Tests') {
            steps {
                sh '''
                    echo "Installing dependencies"
                    npm ci

                    echo "Installing Playwright browsers"
                    npx playwright install --with-deps chromium

                    echo "Cleaning old results"
                    rm -rf allure-results playwright-report playwright-html-report test-results

                    echo "Running DEV tests"
                    npx playwright test --grep "@login" --config=playwright.config.dev.ts || true

                    mkdir -p allure-results
                    echo "Environment=DEV" > allure-results/environment.properties
                '''
            }
        }

        stage('🔍 QA Tests') {
            steps {
                sh '''
                    rm -rf allure-results playwright-report playwright-html-report test-results
                    npx playwright test --grep "@login" --config=playwright.config.qa.ts || true

                    mkdir -p allure-results
                    echo "Environment=QA" > allure-results/environment.properties
                '''
            }
        }

        stage('🎯 STAGE Tests') {
            steps {
                sh '''
                    rm -rf allure-results playwright-report playwright-html-report test-results
                    npx playwright test --grep "@login" --config=playwright.config.stage.ts || true

                    mkdir -p allure-results
                    echo "Environment=STAGE" > allure-results/environment.properties
                '''
            }
        }

        stage('🚀 PROD Tests') {
            steps {
                sh '''
                    rm -rf allure-results playwright-report playwright-html-report test-results
                    npx playwright test --grep "@login" --config=playwright.config.prod.ts || true

                    mkdir -p allure-results
                    echo "Environment=PROD" > allure-results/environment.properties
                '''
            }
        }
    }

    post {
        success {
            slackSend(
                color: 'good',
                message: "✅ Playwright Pipeline PASSED\n${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "❌ Playwright Pipeline FAILED\n${env.BUILD_URL}"
            )
        }
    }
}
