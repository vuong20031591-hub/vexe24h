import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SearchResults from "@/pages/search-results";
import Booking from "@/pages/booking";
import BookingSuccess from "@/pages/booking-success";
import MyTickets from "@/pages/my-tickets";
import NewsPage from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import Terms from "@/pages/terms";
import Refund from "@/pages/refund";
import Lookup from "@/pages/lookup";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path="/booking/:scheduleId" component={Booking} />
      <Route path="/booking-success" component={BookingSuccess} />
      <Route path="/my-tickets" component={MyTickets} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/news" component={NewsPage} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund" component={Refund} />
      <Route path="/lookup" component={Lookup} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
