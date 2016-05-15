import development from './development';
import production from './production';

const env = process.env.NODE_ENV || 'development';
const config = {
  development,
  production
};


function exportConfig(env) {
  return config[env];
}

export default exportConfig(env);
