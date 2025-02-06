import React from 'react';
import { useParams } from 'react-router-dom';
import { useBrands } from '../hooks/useBrands';
import PageLayout from '../components/PageLayout';
import ProductCard from '../partials/ProductCard';
import ProductsSection from '../partials/ProductsSection';

export default function SelectedBrand() {
  const { brandName } = useParams();
  const { products, loading, error } = useBrands(brandName);

  if (loading) {
    return (
      <PageLayout title="تحميل...">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="حدث خطأ">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          {error}
        </div>
      </PageLayout>
    );
  }

  if (!products || products.length === 0) {
    return (
      <PageLayout title="لا يوجد منتجات">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          لا يوجد منتجات في هذا القسم حالياً
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={brandName}>
        <br/>
        <br/>
      {/* <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} props={{ product }} />
          ))}
        </div>
      </div> */}
      <ProductsSection props={{ category: products }} />
      <br/>
      <br/>
    </PageLayout>
  );
}
