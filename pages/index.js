import style from '../styles/style.scss';
import Header from '../components/Header';
// import Main from '../components/Main';
import API_KEY from '../api_key';

const Index = () => (
	<div>
		<style dangerouslySetInnerHTML={{ __html: style }} />
		<Header />
		{/* <Main movies={movies} /> */}
	</div>
);

Index.getInitialProps = async () => {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
	);
	const { results } = await res.json();
	return { movies: results };
};

export default Index;
