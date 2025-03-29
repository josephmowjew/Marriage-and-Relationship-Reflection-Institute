'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { format } from 'date-fns';
import { Suspense } from 'react';

interface Seminar {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  audienceType: string;
  slug: string;
}

interface PageParams {
  id: string;
}

function EditSeminarContent({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState<Seminar>({
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
    audienceType: '',
    slug: '',
  });

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        setFetchLoading(true);
        const response = await fetch(`/api/seminars/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch seminar');
        }
        
        const data = await response.json();
        
        // Format the date for the date input (YYYY-MM-DD)
        const formattedDate = format(new Date(data.date), 'yyyy-MM-dd');
        
        setFormData({
          ...data,
          date: formattedDate,
        });
      } catch (err) {
        console.error('Error fetching seminar:', err);
        setError('Failed to load seminar data');
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchSeminar();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate image
    if (!formData.imageUrl) {
      setError('Please upload an image for the seminar');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/seminars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update seminar');
      }

      router.push('/admin/seminars');
    } catch (err) {
      console.error('Error updating seminar:', err);
      setError('Failed to update seminar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="p-0 hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Seminar</h1>
            <p className="mt-1 text-gray-600">
              Update seminar information
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter seminar title"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-gray-100"
                placeholder="enter-seminar-slug"
                readOnly
              />
              <p className="mt-1 text-sm text-gray-500">
                Slug cannot be changed as it's used in URLs
              </p>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label htmlFor="audienceType" className="block text-sm font-medium text-gray-700 mb-1">
                Audience Type *
              </label>
              <select
                id="audienceType"
                name="audienceType"
                required
                value={formData.audienceType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value="">Select audience type</option>
                <option value="For Couples">For Couples</option>
                <option value="For Ministry Leaders">For Ministry Leaders</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seminar Image *
              </label>
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                defaultImage={formData.imageUrl}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter seminar description"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Updating...' : 'Update Seminar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main page component
export default function EditSeminarPage({ params }: { params: PageParams }) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
      </div>
    }>
      <EditSeminarContent id={params.id} />
    </Suspense>
  );
} 