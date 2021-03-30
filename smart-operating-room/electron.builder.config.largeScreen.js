module.exports = {
  'productName': '术中大屏',
  'appId': 'large-screen',
  'directories': {
    'output': 'build/large-screen'
  },
  'publish': [
    {
      'provider': 'generic',
      'url': 'http://128.0.18.38:8080/nursing/largescreen'
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
    'icon': 'build/icons/large_screen.ico',
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
    'installerIcon': 'build/icons/large_screen.ico',
    'uninstallerIcon': 'build/icons/large_screen.ico',
    'installerHeaderIcon': 'build/icons/large_screen.ico',
    'createDesktopShortcut': true,
    'createStartMenuShortcut': true,
    'shortcutName': '术中大屏'
  }
}
