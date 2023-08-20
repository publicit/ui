pipeline {
    agent {
        docker { 
            image 'node:18'
            reuseNode true
        }
    }
    environment {
        AWS_DEFAULT_REGION = "us-east-2"
        AWS_CREDENTIALS = credentials('publicit-aws-jenkins')
        AWS_ACCESS_KEY_ID = "${AWS_CREDENTIALS_USR}"
        AWS_SECRET_ACCESS_KEY = "${AWS_CREDENTIALS_PSW}"
        REACT_APP_TAG_NAME = "${env.TAG_NAME}"
        REACT_APP_GIT_COMMIT = "${env.GIT_COMMIT}"
        REACT_APP_KEYCLOAK_REALM = "bp"
        REACT_APP_KEYCLOAK_URL = "https://dev.sso.publicitux.com/"
        REACT_APP_KEYCLOAK_CLIENT_ID = "publicit-react-auth"
        REACT_APP_BASE_API_URL = "/api"
        REACT_APP_FAKE_DATA = "true"
    }
    stages {
        stage ("Dependencies"){
            when {
                buildingTag()
            }
            steps {
                sh '''
                    npm i
                '''
            }
        }
        stage ("Build"){
            when {
                buildingTag()
            }
            steps {
                sh '''
                    npm run build
                '''
            }
        }
        stage("AWS Setup") {
            when {
                buildingTag()
            }
            steps {
                sh '''
                    cd /
                    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                    unzip awscliv2.zip
                    ./aws/install
                '''
            }
        }
        stage("Deployment") {
            when {
                buildingTag()
            }
            steps {
                sh '''
                    aws s3 sync ./build/ s3://dev.ui.publicit.com --delete
                '''
            }
        }        
    }
    post {

        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: false,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}