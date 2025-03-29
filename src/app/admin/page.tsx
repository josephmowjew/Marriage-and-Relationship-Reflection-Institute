'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Presentation, Users, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Welcome back, {session?.user?.name || 'Administrator'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Seminars"
          description="Manage your seminars and events"
          count="3"
          icon={Presentation}
          href="/admin/seminars"
          color="bg-blue-500"
        />
        <DashboardCard
          title="Users"
          description="Manage administrators and users"
          count="1"
          icon={Users}
          href="/admin/users"
          color="bg-green-500"
        />
        <DashboardCard
          title="Settings"
          description="Configure system settings"
          icon={Settings}
          href="/admin/settings"
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Seminars</h2>
          <Button asChild>
            <Link href="/admin/seminars/create" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Add Seminar
            </Link>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Building Strong Foundations in Marriage</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Feb 28, 2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Johannesburg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    For Couples
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Pastoral Leadership Excellence</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Mar 15, 2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Cape Town</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    For Ministry Leaders
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Communication in Marriage</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Apr 5, 2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Durban</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    For Couples
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  count?: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

function DashboardCard({
  title,
  description,
  count,
  icon: Icon,
  href,
  color,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${color} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                {count && (
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 