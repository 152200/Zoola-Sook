import React from 'react';
import PageLayout from '../components/PageLayout';
import ProductsSection from '../partials/ProductsSection';
import { useProducts } from '../hooks/useProducts';

export default function WatchesPage() {
  const { products, loading } = useProducts("ساعات");

  return (
    <PageLayout title="ساعات">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsSection props={{ category: products }} />
      )}
    </PageLayout>
  );
}