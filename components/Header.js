import { observer } from 'mobx-react';

@observer
class Header extends React.Component {
	handleChange = ({ target: { value } }) => this.props.searchStore.setSearchTerm(value);
	render() {
		return (
			<div className="header">
				<div className="container padding--top25">
					<div className="field is-horizontal">
						<div className="field-body">
							<div className="field">
								<div className="control has-icons-left has-icons-right">
									<h1>{this.props.searchStore.searchTerm}</h1>
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
