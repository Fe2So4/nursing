module.exports = {
  'productName': '接单中心',
  'appId': 'order-screen',
  'directories': {
    'output': 'build/fj-order-screen'
  },
  'publish': [
    {
      'provider': 'generic',
      'url': 'http://128.0.18.38:8080/nursing/orderscreen'
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
    'icon': 'build/icons/order_screen.ico',
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
    'installerIcon': 'build/icons/order_screen.ico',
    'uninstallerIcon': 'build/icons/order_screen.ico',
    'installerHeaderIcon': 'build/icons/order_screen.ico',
    'createDesktopShortcut': true,
    'createStartMenuShortcut': true,
    'shortcutName': '接单中心'
  }
}
