
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';

// Типизируем элемент root
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}

// Создаем root с правильным типом
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
) as void;