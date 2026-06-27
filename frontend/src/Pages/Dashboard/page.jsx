import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Header from '../../_components/Header'
import DashboardLayout from './dashboardlayout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'

function Dashboard() {
  const { user } = useAuth0()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <DashboardLayout>
        <main className="flex-1 p-6 md:p-10">
          <Card className="bg-slate-900 border-purple-500/10 text-slate-100 shadow-xl shadow-purple-950/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Welcome, {user?.name || 'Learner'}!
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your personalized learning journey starts here.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p>Here's a summary of your progress and upcoming lessons.</p>
            </CardContent>
          </Card>
        </main>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard;