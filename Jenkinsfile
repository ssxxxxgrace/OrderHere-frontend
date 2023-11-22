pipeline {
    agent any 
    tools{
        nodejs "Node16"
    }
    environment{
        Vercel_Token = credentials('lawbb-vercel-orderhere-front-end')
    }
    
    stages {
        stage('Environment') {
            steps {
                //sh 'strings /lib64/libc.so.6 |grep GLIBC_'
                sh 'node -v'
                sh 'npm install'
                sh 'npm install next'
                
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test'){
            steps{
               
                sh 'npm run test'
            }
        }
        stage('Deploy'){
            steps{
              sh 'vercel --token = $Vercel_Token --prod --confirm'  
            }
            
        }
    }
}
