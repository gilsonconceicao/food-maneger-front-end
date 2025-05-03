import FilterFood from '@/components/Food/FilterFood';
import FoodGrid from '@/components/Food/FoodGrid';
import { useFoodListQuery } from '@/hooks/Foods/useFoodContext';
import { Food } from '@/services/Foods/Foods.type';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const ITEMS_PER_PAGE = 20;

export const Home: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(0);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasMore, setHasMore] = useState(true);

  const {
    data,
    isLoading,
    isFetching,
    error
  } = useFoodListQuery({ page, size: ITEMS_PER_PAGE });

  const isLoadingMore = isFetching && page > 0;

  useEffect(() => {
    if (data?.data) {
      const fetchedFoods = data.data;

      setAllFoods(prev => [...prev, ...fetchedFoods]);

      if (fetchedFoods.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      const unique = Array.from(new Set(
        [...allFoods, ...fetchedFoods]
          .filter(food => food.category)
          .map(food => food.category as string)
      ));
      setCategories(unique);
    }
  }, [data]);

  const lastFoodElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore || activeCategory !== 'all') return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore, activeCategory]);

  const filteredFoods = activeCategory === 'all'
    ? allFoods
    : allFoods.filter(food => food.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className='flex justify-between items-center'>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Nosso Cardápio</h2>
            <p className="text-gray-300">Descubra nossos pratos deliciosos preparados com ingredientes frescos.</p>
          </div>
        </div>

        <FilterFood
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <FoodGrid
          foods={filteredFoods}
          isLoading={isLoading}
          error={error}
          lastFoodRef={lastFoodElementRef}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
};
