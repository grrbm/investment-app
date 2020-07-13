const CONNECT_URL = RUN_ON_HEROKU 
                      ? 'http://grrbm-investment-app.herokuapp.com'
                      : 'http://192.168.0.21:3001'
                    
module.exports = CONNECT_URL