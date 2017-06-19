import React, { Component } from 'react'
import { observer } from 'mobx-react'

import appStore from '../lib/app-store'
import updater from './update-model'
import ipc from '../lib/ipc'

@observer
class UpdateBanner extends Component {
  componentDidMount () {
    this.checkId = setInterval(this._checkForUpdate, (5 * 60 * 1000))
    this._checkForUpdate()
  }

  componentWillUnmount () {
    document.getElementsByTagName('html')[0].classList.remove('has-updates')

    ipc.offUpdaterCheck()
    clearInterval(this.checkId)
  }

  render () {
    if (!appStore.updateAvailable) return null

    document.getElementsByTagName('html')[0].classList.add('has-updates')

    return (
      <div id='updates-available'>
        New updates are available
        <strong onClick={this._downloadUpdate}>
          <i className='fa fa-download'></i>{' '}
          Update
        </strong>
      </div>
    )
  }

  _checkForUpdate () {
    ipc.offUpdaterCheck()
    ipc.updaterCheck()
    .then((version) => {
      appStore.set({ updateAvailable: !!version })
    })
    .catch((error) => {
      console.warn('Error checking for updates:', error) // eslint-disable-line no-console
    })
  }

  _downloadUpdate () {
    updater.openUpdateWindow()
  }
}

export default UpdateBanner