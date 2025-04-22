"use client";

import React, { useState, useEffect } from 'react';
import { Flashcard, spoleczenstwoPracaPojeciaFlashcards, technologiaTransportMiejscaFlashcards, domJedzenieCzasWolnyFlashcards } from '@/flashcards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"

interface WordSet {
    id: string;
    title: string;
    flashcards: Flashcard[];
}
const wordSets: WordSet[] = [
    {
        id: 'spoleczenstwoPracaPojecia',
        title: 'Społeczeństwo, Praca i Pojęcia',
        flashcards: spoleczenstwoPracaPojeciaFlashcards
    },
    {
        id: 'technologiaTransportMiejsca',
        title: 'Technologia, Transport i Miejsca',
        flashcards: technologiaTransportMiejscaFlashcards
    },
    {
        id: 'domJedzenieCzasWolny',
        title: 'Dom, Jedzenie i Czas Wolny',
        flashcards: domJedzenieCzasWolnyFlashcards
    },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Home() {
  const [selectedSet, setSelectedSet] = useState<string>(wordSets[0].id);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(wordSets.find(set => set.id === selectedSet)?.flashcards || []);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [languageSide, setLanguageSide] = useState<'polish' | 'spanish'>('polish');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [openAllWords, setOpenAllWords] = useState(false);

  useEffect(() => {
      const savedSet = localStorage.getItem('selectedSet');
      if (savedSet) {
          setSelectedSet(savedSet);
      }
  }, []);

  useEffect(() => {
      localStorage.setItem('selectedSet', selectedSet);
      const currentSet = wordSets.find(set => set.id === selectedSet);
      setFlashcards(currentSet?.flashcards || []);
      setCurrentCardIndex(0);
      setIsFlipped(false);
  }, [selectedSet]);

    useEffect(() => {
    const savedState = localStorage.getItem(`flashcardState_${selectedSet}`);
    const savedIndex = localStorage.getItem(`currentCardIndex_${selectedSet}`);
    if (savedState) {
      setFlashcards(JSON.parse(savedState));
    }
    if (savedIndex) {
      setCurrentCardIndex(parseInt(savedIndex, 10));
    }
  }, [selectedSet]);

  useEffect(() => {
    localStorage.setItem(`flashcardState_${selectedSet}`, JSON.stringify(flashcards));
    localStorage.setItem(`currentCardIndex_${selectedSet}`, currentCardIndex.toString());
  }, [flashcards, currentCardIndex, selectedSet]);

  const handleNextCard = () => {
    goToNextCard();
  }

  const markAsGotIt = () => {
    handleNextCard();

    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex].gotIt = true;
    setFlashcards(updatedFlashcards);
  };


  const markAsDontKnow = () => {
    goToNextCard();
  };

    const goToNextCard = () => {
        let nextIndex = currentCardIndex;

        if (isRandom) {
            const remainingCards = flashcards.filter(card => !card.gotIt);
            if (remainingCards.length === 0) {
                return;
            }

            let unlearnedIndices = flashcards
                .map((card, index) => (!card.gotIt ? index : -1))
                .filter(index => index !== -1);

            if (unlearnedIndices.length === 0) {
                return;
            }

            if (unlearnedIndices.length > 1) {
                do {
                    nextIndex = unlearnedIndices[Math.floor(Math.random() * unlearnedIndices.length)];
                } while (nextIndex === currentCardIndex);
            } else {
                nextIndex = unlearnedIndices[0];
            }
        } else {
            let nextIndexCalculated = false;
            for (let i = 1; i <= flashcards.length; i++) {
                let tempIndex = (currentCardIndex + i) % flashcards.length;
                if (!flashcards[tempIndex].gotIt) {
                    nextIndex = tempIndex;
                    nextIndexCalculated = true;
                    break;
                }
            }
            if (!nextIndexCalculated) {
                return;
            }
        }

        setTimeout(() => {
          setCurrentCardIndex(nextIndex);
        }, 250)
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

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const displayedWord = isFlipped
    ? languageSide === 'polish'
      ? currentCard.spanish
      : currentCard.polish
    : languageSide === 'polish'
      ? currentCard.polish
      : currentCard.spanish;

    if (remainingCardsCount === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
                <h1 className="text-2xl font-bold mb-4 text-primary"></h1>
                <p className="text-lg">All done!</p>
                <Button variant="link" onClick={resetProgress} className="mt-4">
                    Reset Progress
                </Button>
            </div>
        );
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
      <h1 className="text-2xl font-bold mb-4 text-primary">FlashTarjetas</h1>

        <Select onValueChange={(value) => setSelectedSet(value)} defaultValue={selectedSet}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Flashcard Set" />
            </SelectTrigger>
            <SelectContent>
                {wordSets.map(set => (
                    <SelectItem key={set.id} value={set.id}>
                        {set.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        
      <Select onValueChange={(value) => setLanguageSide(value as 'polish' | 'spanish')} defaultValue="polish">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="polish">Polish 🇵🇱</SelectItem>
          <SelectItem value="spanish">Spanish 🇪🇸</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full max-w-md mt-4">
        <Card className={`w-full h-48 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            <CardContent className="absolute inset-0 flex items-center justify-center p-6 backface-hidden cursor-pointer" onClick={handleCardClick}>
                <div className="text-xl font-semibold unselectable">
                    {languageSide === 'polish' ? currentCard.polish : currentCard.spanish}
                </div>
            </CardContent>
            <CardContent className="absolute inset-0 flex items-center justify-center p-6 backface-hidden cursor-pointer rotate-y-180 bg-yellow-100" onClick={handleCardClick}>
                <div className="flex flex-col items-center">
                    <div className="text-xl font-semibold unselectable">
                        {languageSide === 'polish' ? currentCard.spanish : currentCard.polish}
                    
                    {currentCard.example && (
                        <div className="mt-2 text-sm text-gray-600 unselectable">
                            {currentCard.example}
                        </div>
                    )}
                    </div>
                </div>

            </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={markAsDontKnow} className="bg-red-500 text-white hover:bg-red-700 unselectable">
          Don't know yet
        </Button>
        <Button onClick={markAsGotIt} className="bg-green-500 text-white hover:bg-green-700 unselectable">
          Got it
        </Button>
      </div>

      <div className="flex items-center mt-2">
        <Checkbox id="random" checked={isRandom} onCheckedChange={setIsRandom} />
        <label htmlFor="random" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
          Random
        </label>
      </div>

      <div className="mt-4 text-gray-600">Flashcards remaining: {remainingCardsCount}/{flashcards.length}</div>

      <Button variant="link" onClick={resetProgress} className="mt-4">
        Reset Progress
      </Button>

      <Dialog open={openAllWords} onOpenChange={setOpenAllWords}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Show All Words
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>All Words</DialogTitle>
            <DialogDescription>
              Here's a list of all the words you're learning.
            </DialogDescription>
          </DialogHeader>
            <ScrollArea className="h-[300px]">
                <div className="grid gap-4 py-4">
                    {flashcards.map((card) => (
                        <div key={card.id} className="flex justify-between">
                            <span>{card.polish}</span>
                            <span>{card.spanish} {card.gotIt ? '✅' : ''}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

