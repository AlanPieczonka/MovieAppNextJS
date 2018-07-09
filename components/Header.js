import { observer, inject } from 'mobx-react';

@inject('searchStore')
@observer
class Header extends React.Component {
	handleChange = ({ target: { value } }) => this.props.searchStore.setSearchTerm(value);
	render() {
		return (
			<div className="header">
				<div className="container padding--25">
					<div className="field is-horizontal">
						<div className="field-body">
							<div className="field">
								<div className="control has-icons-left has-icons-right">
									<input
										className="input is-large header"
										type="search"
										placeholder="Search movies"
										value={this.props.searchStore.searchTerm}
										onChange={this.handleChange}
									/>
									<span className="icon is-medium is-left">
										<i className="fas fa-envelope" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
