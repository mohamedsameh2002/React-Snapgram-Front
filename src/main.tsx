import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./redux/store.tsx"
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryClient=new QueryClient({
        defaultOptions:{queries:{retry:5,retryDelay:1000}}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
                <Provider store={store}>
                        <QueryClientProvider client={queryClient}>
                                <App />
                        </QueryClientProvider>
                </Provider>
        </BrowserRouter>
)
