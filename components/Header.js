class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="container padding--top25">
					<div className="field is-horizontal">
						<div className="field-body">
							<div className="field">
								<div className="control has-icons-left has-icons-right">
									<input
										className="input is-large header"
										type="search"
										placeholder="Search movies"
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
