import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Header extends React.Component {
  handleChange = ({ target: { value } }) =>
    this.props.store.setSearchTerm(value)
  render () {
    const { store } = this.props
    return (
      <div className='header'>
        <div className='container padding--25'>
          <div className='field is-horizontal'>
            <div className='field-body'>
              <div className='field'>
                <div className='control has-icons-left has-icons-right'>
                  <input
                    className='input is-large header'
                    type='search'
                    placeholder='Search movies'
                    value={store.searchTerm}
                    onChange={this.handleChange}
                  />
                  <span className='icon is-medium is-left'>
                    <i className='fas fa-search input-icon' />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
