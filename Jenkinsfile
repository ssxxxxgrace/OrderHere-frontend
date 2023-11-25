pipeline {
    agent any 


    environment{
        Vercel_Token = credentials('lawbb-vercel-orderhere-front-end')
        PATH = "/usr/local/lib/node/nodejs/bin:${PATH}"

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

              sh 'vercel --token $Vercel_Token --prod --yes --name order-here-front-end-lawbb-test'  

            }
            
        }
    }
}
