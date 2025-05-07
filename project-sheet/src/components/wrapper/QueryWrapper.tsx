"use client"
import {
    
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
 const queryClient = new QueryClient()
 import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function QueryWrapper({children}:{children:React.ReactNode}) {
  return (
    
    
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-right'/>
    </QueryClientProvider>
  )
}
export default QueryWrapper