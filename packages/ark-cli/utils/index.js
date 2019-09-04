const path = require('path');
const fs = require('fs-extra');
const cp = require('child_process');
const ora = require('ora');

const { log, error } = require('../utils/log');
const { GITIGNORES } = require('../configs');

const spinner = ora();

// 确保目录为空目录，各种以点开头的文件除外
exports.isDangerousToCreateProject = projectName => (
    (fs.pathExistsSync(projectName) && projectName !== '.')
      || (
        projectName === '.' && fs.readdirSync(projectName).filter(fileName => !(/^\./.test(fileName))).length
        )
    );


exports.initTemplate = async ({
    projectName, template,
}) => {
    const projectPath = path.join(process.cwd(), projectName);
    const appName = path.basename(projectPath);
    
    fs.ensureDirSync(projectName);
    spinner.start('正在创建模板');
    
    try {
        await installTemplate(projectPath, template);
    } catch (e) {
        log();
        error(e);
        spinner.stop();
        process.exit(1);
    }
    
    spinner.succeed('模板已创建');
};

exports.installDependencies = async ({ projectName, template }) => {
  const projectPath = path.join(process.cwd(), projectName);

  try {
    log('🏗 开始安装依赖');
    cp.execSync('yarn install', {
      cwd: projectPath,
      stdio: 'inherit',
    });

    log('🍓 启动服务');

    cp.execSync('yarn start', {
      cwd: projectPath,
      stdio: 'inherit',
    });

  }catch(e){
    spinner.stop();
    process.exit(1);
  }
};

function installTemplate(projectPath, template) {
    const templateName = template  ? `${template}-templete` : 'react-templete';
    const moduleName = `@ark-plan/ark-templete`;
    const command = `npm init -y && yarn add ${moduleName}`;
  
    return new Promise((resolve, reject) => {
      cp.exec(command, { cwd: projectPath, stdio: 'inherit' }, async (err) => {
        if (err) {
          reject(err);
        }

        spinner.text = '正在创建模板，可能需要花点时间，喝口水吧～～🍵';
        
        try {
          // 从node_modules中复制模板到项目路径
          await fs.copy(`${projectPath}/node_modules/${moduleName}/${templateName}`, projectPath);
          // 生成.gitignore
          await fs.outputFile(`${projectPath}/.gitignore`, GITIGNORES.join('\n'));
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  }