pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.43.0-jammy'
            args '--ipc=host'
        }
    }

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        NODE_VERSION = '20'
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.cache/ms-playwright"
        SLACK_WEBHOOK_URL = credentials('slack-webhook-token')
        EMAIL_RECIPIENTS = 'narendrapathala@gmail.com, sarithapathala@gmail.com'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {

        stage('🔧 DEV Tests') {
            steps {
                sh 'npm ci'

                sh 'npx playwright install chromium'

                sh 'rm -rf allure-results playwright-report playwright-html-report test-results'

                script {
                    env.DEV_TEST_STATUS = sh(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.dev.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                sh '''
                    mkdir -p allure-results
                    echo "Environment=DEV" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.dev.ts" >> allure-results/environment.properties
                '''
            }
        }

        stage('🔍 QA Tests') {
            steps {
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results'

                script {
                    env.QA_TEST_STATUS = sh(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.qa.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                sh '''
                    mkdir -p allure-results
                    echo "Environment=QA" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.qa.ts" >> allure-results/environment.properties
                '''
            }
        }

        stage('🎯 STAGE Tests') {
            steps {
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results'

                script {
                    env.STAGE_TEST_STATUS = sh(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.stage.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                sh '''
                    mkdir -p allure-results
                    echo "Environment=STAGE" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.stage.ts" >> allure-results/environment.properties
                '''
            }
        }

        stage('🚀 PROD Tests') {
            steps {
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results'

                script {
                    env.PROD_TEST_STATUS = sh(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.prod.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                sh '''
                    mkdir -p allure-results
                    echo "Environment=PROD" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.prod.ts" >> allure-results/environment.properties
                '''
            }
        }
    }

    post {
        always {
            script {
                env.DEV_EMOJI   = env.DEV_TEST_STATUS == 'success' ? '✅' : '❌'
                env.QA_EMOJI    = env.QA_TEST_STATUS == 'success' ? '✅' : '❌'
                env.STAGE_EMOJI = env.STAGE_TEST_STATUS == 'success' ? '✅' : '❌'
                env.PROD_EMOJI  = env.PROD_TEST_STATUS == 'success' ? '✅' : '❌'
            }
        }

        success {
            slackSend(
                color: 'good',
                message: """✅ *Playwright Pipeline: All Tests Passed*

${env.DEV_EMOJI} DEV
${env.QA_EMOJI} QA
${env.STAGE_EMOJI} STAGE
${env.PROD_EMOJI} PROD

🔗 ${env.BUILD_URL}
"""
            )
        }

        failure {
            slackSend(
                color: 'danger',
                message: """❌ *Playwright Pipeline: Failed*

${env.DEV_EMOJI} DEV
${env.QA_EMOJI} QA
${env.STAGE_EMOJI} STAGE
${env.PROD_EMOJI} PROD

🔗 ${env.BUILD_URL}
"""
            )
        }

        unstable {
            slackSend(
                color: 'warning',
                message: """⚠️ *Playwright Pipeline: Unstable*
🔗 ${env.BUILD_URL}
"""
            )
        }
    }
}
