module.exports = {
  'productName': 'smart-nursing',
  'appId': 'smart-nursing',
  'directories': {
    'output': 'build/smart-nursing'
  },
  'publish': [
    {
      'provider': 'generic',
      'url': 'http://128.0.18.38:8080/nursing/smartnursing'
    }
  ],
  'files': [
    'dist/electron/**/*'
  ],
  'dmg': {
    'contents': [
      {
        'x': 410,
        'y': 150,
        'type': 'link',
        'path': '/Applications'
      },
      {
        'x': 130,
        'y': 150,
        'type': 'file'
      }
    ]
  },
  'mac': {
    'icon': 'build/icons/icon.icns'
  },
  'win': {
    'icon': 'build/icons/smart_nursing.ico',
    target: {
      target: 'nsis',
      arch: 'ia32'
    }
  },
  'linux': {
    'icon': 'build/icons'
  },
  'nsis': {
    'oneClick': false,
    'allowElevation': true,
    'allowToChangeInstallationDirectory': true,
    'installerIcon': 'build/icons/smart_nursing.ico',
    'uninstallerIcon': 'build/icons/smart_nursing.ico',
    'installerHeaderIcon': 'build/icons/smart_nursing.ico',
    'createDesktopShortcut': true,
    'createStartMenuShortcut': true,
    'shortcutName': 'smart_nursing'
  }
}
