pipeline {
    agent any 
    enviornment{
        Vercel_Token = credentials('lawbb-vercel-orderhere-front-end')
    }
    tools {nodejs "nodejs"}
    stages {
        stage('environment') {
            steps {
                sh 'npm install'
                sh 'npm start'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test'){
            steps{
                sh 'node -v'
                sh 'npm run test'
            }
        }
        stage('deploy'){
            sh 'vercel --token = $Vercel_Token --prod --confirm'
        }
    }
}
