import { Carousel, Container, GrowBusiness, Info } from 'components';
import { FC } from 'react';

const Dashboard: FC = () => {
	return (
		<Container>
			<>
				<Info />
				<GrowBusiness />
				<Carousel />
			</>
		</Container>
	);
};

export default Dashboard;
