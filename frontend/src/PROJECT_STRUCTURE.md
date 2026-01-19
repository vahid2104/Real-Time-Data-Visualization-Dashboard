# Real-Time Data Visualization Dashboard

## 🎯 Project Overview

A modern, production-ready real-time data visualization dashboard built with React, TypeScript, TailwindCSS, and Recharts. This dashboard simulates real-time data updates from multiple sources including financial markets, IoT sensors, and system metrics.

## 📁 Project Structure

```
/
├── App.tsx                          # Main application component
├── components/                      # React components
│   ├── index.ts                    # Component exports
│   ├── Navbar.tsx                  # Top navigation bar
│   ├── Sidebar.tsx                 # Side navigation menu
│   ├── DashboardHeader.tsx         # Dashboard header with controls
│   ├── KPIStatCard.tsx             # KPI statistics card
│   ├── RealtimeLineChart.tsx       # Real-time line chart (Recharts)
│   ├── RealtimeBarChart.tsx        # Real-time bar chart (Recharts)
│   ├── AlertItem.tsx               # Single alert component
│   ├── AlertsPanel.tsx             # Alerts panel container
│   ├── ActivityTimeline.tsx        # Activity timeline
│   ├── DashboardGrid.tsx           # Responsive grid system
│   ├── ConnectionStatus.tsx        # WebSocket connection indicator
│   ├── LoadingSkeleton.tsx         # Loading skeleton states
│   ├── StatsSummary.tsx            # Statistics summary
│   └── QuickSettings.tsx           # Quick settings panel
├── hooks/                          # Custom React hooks
│   ├── useRealtimeData.ts         # Real-time data simulation hooks
│   ├── useWebSocket.ts            # WebSocket connection hook
│   └── useDashboard.ts            # Dashboard state management
├── data/                           # Mock data and generators
│   └── mockData.ts                # Mock data generation
├── utils/                          # Utility functions
│   ├── formatters.ts              # Data formatters
│   └── chartConfig.ts             # Chart configurations
├── types/                          # TypeScript type definitions
│   └── dashboard.ts               # Dashboard types
└── styles/                         # Global styles
    └── globals.css                # Tailwind CSS configuration
```

## 🚀 Features

### Core Features
- ✅ **Real-time Data Updates**: Simulated WebSocket connections updating every 1-2 seconds
- ✅ **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- ✅ **12-Column Grid Layout**: Flexible grid system for component arrangement
- ✅ **Loading States**: Skeleton loading animations for better UX
- ✅ **Smooth Animations**: Chart transitions and data updates
- ✅ **Performance Optimized**: Efficient rendering with React hooks

### Dashboard Components

#### 1. **Top Navigation Bar**
- Logo and branding
- Global search functionality
- Notification bell with indicator
- Settings access
- User profile with avatar

#### 2. **Side Navigation Menu**
- Dashboard (active by default)
- Alerts
- Analytics
- Settings
- Upgrade prompt card

#### 3. **KPI Statistics Cards** (4 cards)
- Current Value (with 24h change)
- 24h Change Percentage
- Maximum Value (24h)
- Minimum Value (24h)
- Color-coded icons and backgrounds
- Trend indicators (up/down arrows)

#### 4. **Real-Time Line Chart**
- Live data streaming indicator
- Smooth line animations
- Custom gradient fill
- Tooltip with dark theme
- Updates every 2 seconds
- Grid and axis customization

#### 5. **Real-Time Bar Chart**
- Server CPU usage visualization
- Color-coded bars (6 servers)
- Animated updates every 3 seconds
- Legend with server names
- Y-axis showing percentage values

#### 6. **Alerts Panel**
- Three severity levels: Critical, Warning, Info
- Color-coded backgrounds and icons
- Timestamp display
- Critical alert counter
- Scrollable list with max height

#### 7. **Activity Timeline**
- Three activity types: Update, Alert, System
- Icon-based indicators
- Relative timestamps
- Connected timeline design
- Scrollable history

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Danger**: Red (#EF4444)
- **Info**: Cyan (#06B6D4)
- **Purple**: (#8B5CF6)

### Typography
- **Font Family**: System fonts (Apple, Segoe, Roboto)
- **Headings**: Medium weight (500)
- **Body**: Normal weight (400)
- **Sizes**: Managed via Tailwind v4 tokens

### Spacing
- **Grid Gap**: 1.5rem (24px)
- **Card Padding**: 1.5rem (24px)
- **Component Margins**: 2rem (32px)

## 🔧 Technical Implementation

### Real-Time Data Simulation

The dashboard uses custom hooks to simulate WebSocket connections:

```typescript
// useRealtimeLineData - Updates line chart every 2 seconds
// useRealtimeBarData - Updates bar chart every 3 seconds
// useRealtimeKPI - Updates KPI cards every 2 seconds
```

### Mock WebSocket Implementation

Located in `/hooks/useWebSocket.ts`:
- Auto-connect on mount
- Reconnection logic (up to 5 attempts)
- Connection status tracking
- Mock message sending/receiving

### Performance Optimizations

1. **Efficient Re-renders**: Use of React.memo and useCallback
2. **Data Window**: Charts maintain fixed data points (21 for line chart)
3. **Animation Duration**: Short 300ms transitions
4. **Lazy Loading**: Components load on-demand
5. **Skeleton States**: Immediate feedback during loading

### Responsive Breakpoints

```css
sm: 640px   - Small devices
md: 768px   - Medium devices  
lg: 1024px  - Large devices
xl: 1280px  - Extra large devices
```

### Grid System

12-column responsive grid:
- **Mobile**: 1 column (full width)
- **Tablet**: 2 columns for KPI cards
- **Desktop**: 4 columns for KPI cards, 8/4 split for charts

## 📊 Data Flow

1. **Initial Load**:
   - Display loading skeletons
   - Initialize data generators
   - Simulate 1.5s loading time
   - Render actual components

2. **Real-Time Updates**:
   - WebSocket hooks create intervals
   - Generate new data points
   - Update state (triggers re-render)
   - Charts animate transitions
   - Old data points removed (sliding window)

3. **User Interactions**:
   - Refresh button: Re-fetch all data
   - Export button: Download data (mock)
   - Filter/time range: Change data scope
   - Settings: Toggle features

## 🛠️ Customization Guide

### Adding New Charts

1. Create component in `/components/YourChart.tsx`
2. Import Recharts components
3. Use theme from `/utils/chartConfig.ts`
4. Add real-time hook in `/hooks/useRealtimeData.ts`
5. Import and use in `App.tsx`

### Modifying Update Intervals

Edit `/utils/chartConfig.ts`:

```typescript
export const updateIntervals = {
  lineChart: 2000,  // Change to desired ms
  barChart: 3000,
  kpiCards: 2000,
};
```

### Adding New Alert Types

Edit `/data/mockData.ts`:

```typescript
export type AlertSeverity = 'info' | 'warning' | 'critical' | 'success';
```

Update `/components/AlertItem.tsx` with new severity config.

### Theming

Global styles in `/styles/globals.css`:
- Modify CSS custom properties in `:root`
- Add dark mode support in `.dark` selector
- Extend Tailwind theme inline

## 📱 Mobile Responsiveness

- **Navigation**: Sidebar becomes hamburger menu
- **Grid**: Single column layout on mobile
- **Charts**: Maintain aspect ratio, reduce axis labels
- **Cards**: Stack vertically with full width
- **Typography**: Scales appropriately

## 🔒 Best Practices Implemented

1. **Type Safety**: Full TypeScript coverage
2. **Component Reusability**: Modular, single-responsibility components
3. **Clean Code**: Consistent naming, organization
4. **Performance**: Optimized renders, efficient updates
5. **Accessibility**: Semantic HTML, ARIA labels
6. **Error Handling**: Graceful fallbacks
7. **Code Splitting**: Logical file organization

## 🚢 Production Readiness

### Checklist
- ✅ TypeScript for type safety
- ✅ Proper component structure
- ✅ Loading states for UX
- ✅ Error boundaries (can be added)
- ✅ Responsive design
- ✅ Performance optimizations
- ✅ Clean folder structure
- ✅ Reusable utilities
- ✅ Mock data generators
- ✅ Documented code

### Next Steps for Production

1. **Connect Real APIs**: Replace mock WebSocket with actual endpoints
2. **Authentication**: Add user auth and protected routes
3. **State Management**: Consider Redux/Zustand for complex state
4. **Error Tracking**: Integrate Sentry or similar
5. **Analytics**: Add usage tracking
6. **Testing**: Unit tests, integration tests, E2E tests
7. **CI/CD**: Automated deployments
8. **Environment Variables**: Manage API keys securely

## 📝 Usage

### Running the Dashboard

The dashboard automatically starts with:
- Mock WebSocket connections active
- Real-time data streaming
- All components rendered
- Loading animations complete after 1.5s

### Interacting with Components

- **Refresh**: Click refresh button in header
- **Export**: Click export button (logs to console)
- **Time Range**: Click calendar dropdown (future feature)
- **Filters**: Click filter button (future feature)
- **Navigation**: Click sidebar items (visual state only)

## 🎓 Learning Resources

This dashboard demonstrates:
- React Hooks (useState, useEffect, useCallback, useRef)
- TypeScript interfaces and types
- Recharts library integration
- TailwindCSS utility-first styling
- Responsive design patterns
- Real-time data handling
- Component composition
- Custom hook creation

## 📄 License

This is a demo project for educational and portfolio purposes.

---

**Built with ❤️ using React, TypeScript, TailwindCSS, and Recharts**
