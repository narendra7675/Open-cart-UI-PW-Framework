
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        NODE_VERSION = '20'
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.cache/ms-playwright"
        SLACK_WEBHOOK_URL = credentials('Slack Webhook Token')
        // Email recipients - update these with your actual email addresses
        EMAIL_RECIPIENTS = 'narendrapathala@gmail.com, sarithapathala@gmail.com'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

stages {

    // ============================================
    // DEV Environment Tests
    // ============================================
    stage('🔧 DEV Tests') {
        steps {
            echo '============================================'
            echo '🎭 Installing Playwright browsers...'
            echo '============================================'
            sh 'npx playwright install chromium'

            echo '============================================'
            echo '🧹 Cleaning previous results...'
            echo '============================================'
            sh 'rm -rf allure-results playwright-report playwright-html-report test-results'

            echo '============================================'
            echo '🧪 Running DEV tests...'
            echo '============================================'
            script {
                env.DEV_TEST_STATUS = sh(
                    script: 'npx playwright test --grep "@login" --config=playwright.config.dev.ts',
                    returnStatus: true
                ) == 0 ? 'success' : 'failure'
            }

            echo '============================================'
            echo '🏷️ Adding Allure environment info...'
            echo '============================================'
            sh '''
                mkdir -p allure-results
                echo "Environment=DEV" > allure-results/environment.properties
                echo "Browser=Google Chrome" >> allure-results/environment.properties
                echo "Config=playwright.config.dev.ts" >> allure-results/environment.properties
            '''
        }
        post {
            always {
                sh '''
                    mkdir -p allure-results-dev
                    cp -r allure-results/* allure-results-dev/ 2>/dev/null || true
                    npx allure generate allure-results-dev --clean -o allure-report-dev || true
                '''

                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report-dev',
                    reportFiles: 'index.html',
                    reportName: 'DEV Allure Report'
                ])

                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'DEV Playwright Report'
                ])

                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-html-report',
                    reportFiles: 'index.html',
                    reportName: 'DEV HTML Report'
                ])

                archiveArtifacts artifacts: 'allure-results-dev/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            }
        }
    }

    // ============================================
    // QA Environment Tests
    // ============================================
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
        post {
            always {
                sh '''
                    mkdir -p allure-results-qa
                    cp -r allure-results/* allure-results-qa/ 2>/dev/null || true
                    npx allure generate allure-results-qa --clean -o allure-report-qa || true
                '''

                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report-qa',
                    reportFiles: 'index.html',
                    reportName: 'QA Allure Report'
                ])
            }
        }
    }

    // ============================================
    // STAGE Environment Tests
    // ============================================
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

    // ============================================
    // PROD Environment Tests
    // ============================================
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

    // ============================================
    // Post-Build Actions (Notifications)
    // ============================================

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

📊 ${env.BUILD_URL}allure
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

📊 ${env.BUILD_URL}allure
"""
        )
    }

    unstable {
        slackSend(
            color: 'warning',
            message: """⚠️ *Playwright Pipeline: Unstable*
📊 ${env.BUILD_URL}allure
"""
        )
    }
}

