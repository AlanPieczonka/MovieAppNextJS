import React from 'react';
import style from '../styles/style.scss';

let coe = "sdf";

const Index = () => (
	<div>
		<style dangerouslySetInnerHTML={{ __html: style }} />

		<div className="container">
			<div className="columns">
				<div className="column">First column</div>
				<div className="column">Second column</div>
				<div className="column">Third column</div>
				<div className="column">Fourth column</div>
			</div>
		</div>
	</div>
);

export default Index;
