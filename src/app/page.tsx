"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Flashcard {
  id: number;
  polish: string;
  spanish: string;
  gotIt: boolean;
}

const initialFlashcards: Flashcard[] = [
  { id: 1, polish: 'Jabłko', spanish: 'Manzana', gotIt: false },
  { id: 2, polish: 'Dom', spanish: 'Casa', gotIt: false },
  { id: 3, polish: 'Książka', spanish: 'Libro', gotIt: false },
  { id: 4, polish: 'Słońce', spanish: 'Sol', gotIt: false },
];

export default function Home() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [languageSide, setLanguageSide] = useState<'polish' | 'spanish'>('polish');
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('flashcardState');
    if (savedState) {
      setFlashcards(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flashcardState', JSON.stringify(flashcards));
  }, [flashcards]);

  const markAsGotIt = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex].gotIt = true;
    setFlashcards(updatedFlashcards);
    goToNextCard();
  };

  const markAsDontKnow = () => {
    goToNextCard();
  };

  const goToNextCard = () => {
    const remainingCards = flashcards.filter(card => !card.gotIt);
    if (remainingCards.length === 1) {
      alert("Congratulations! You've learned all the words!");
      return;
    }
    let nextIndex = currentCardIndex;
    do {
      nextIndex = (nextIndex + 1) % flashcards.length;
    } while (flashcards[nextIndex].gotIt);
    setCurrentCardIndex(nextIndex);
    setIsFlipped(false);
  };

  const resetProgress = () => {
    const resetFlashcards = flashcards.map(card => ({ ...card, gotIt: false }));
    setFlashcards(resetFlashcards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const remainingCardsCount = flashcards.filter(card => !card.gotIt).length;
  const currentCard = flashcards[currentCardIndex];

  const cardContent = languageSide === 'polish' ? currentCard.polish : currentCard.spanish;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
      <h1 className="text-2xl font-bold mb-4 text-primary">LinguaFlash</h1>

      <Select onValueChange={(value) => setLanguageSide(value as 'polish' | 'spanish')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="polish">Polish</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full max-w-md mt-4">
        <Card className={`w-full h-48 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <CardContent
            className="absolute inset-0 flex items-center justify-center p-6 backface-hidden"
            onClick={handleCardClick}
          >
            <div className="text-xl font-semibold">{cardContent}</div>
          </CardContent>
          <CardContent
            className="absolute inset-0 flex items-center justify-center p-6 rotate-y-180 backface-hidden"
            onClick={handleCardClick}
          >
            <div className="text-xl font-semibold">
              {languageSide === 'polish' ? currentCard.spanish : currentCard.polish}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 text-gray-600">Flashcards remaining: {remainingCardsCount}</div>

      <Button variant="link" onClick={resetProgress} className="mt-4">
        Reset Progress
      </Button>
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={markAsDontKnow} className="bg-red-500 text-white hover:bg-red-700">
          Don't know yet
        </Button>
        <Button onClick={markAsGotIt} className="bg-green-500 text-white hover:bg-green-700">
          Got it
        </Button>
      </div>
    </div>
  );
}
