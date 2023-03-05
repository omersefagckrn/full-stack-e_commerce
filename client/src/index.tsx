import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './index.css';

// Redux imported
import store from 'redux/store';
import router from 'route';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
	<Provider store={store}>
		<Toaster
			toastOptions={{
				duration: 1500
			}}
			position='top-right'
			reverseOrder={false}
		/>
		<RouterProvider router={router} />
	</Provider>
);
