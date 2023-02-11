import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './index.css';

/* Redux imported */
import store from 'redux/store';
import router from 'route';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster position='top-right' reverseOrder={false} />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
