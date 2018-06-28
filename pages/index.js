import style from '../styles/style.scss';
import Header from '../components/Header';
import Main from '../components/Main';

const Index = () => (
	<div>
		<style dangerouslySetInnerHTML={{ __html: style }} />
		<Header />
		<Main />
	</div>
);

export default Index;
