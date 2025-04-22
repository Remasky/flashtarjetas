"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Flashcard, spoleczenstwoPracaPojeciaFlashcards, technologiaTransportMiejscaFlashcards, domJedzenieCzasWolnyFlashcards, FlashcardSet } from '@/flashcards';
import { Button } from '@/components/ui/button';

import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface WordSet {
    id: string;
    title: string,
    flashcards: Flashcard[];
}
const wordSets: WordSet[] = [
    {
        id: 'spoleczenstwoPracaPojecia',
        title: 'Społeczeństwo i Praca',
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
  const [isRandom, setIsRandom] = useState(true);
  const [openAllWords, setOpenAllWords] = useState(false);
    const [openWordSets, setOpenWordSets] = useState(false);

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

  const markAsGotIt = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex].gotIt = true;
    setFlashcards(updatedFlashcards);
    loadNextCard();
  };


  const handleNextCard = () => {
    loadNextCard();
  }

  const loadNextCard = () => {
    goToNextCard();
  }

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

  // Function to clear all localStorage data.
  const hardReset = () => {
    localStorage.clear();
    window.location.reload(); // Refresh the page to reset the application state.
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

  const formatExample = (example: string) => {
    const parts = example.split('**');
    return parts.reduce((acc, part, index) => {
      if (index % 2 === 1) return [...acc, <b key={index}>{part}</b>];
      return [...acc, part];
    }, [] as (string | JSX.Element)[]);
  };

    const toggleLanguageSide = () => {
      setLanguageSide(current => (current === 'polish' ? 'spanish' : 'polish'));
    };


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
   
        
    return <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
      <h1 className="text-2xl font-bold mb-4 text-primary">FlashTarjetas</h1>
        <Sheet open={openWordSets} onOpenChange={setOpenWordSets}>
            <SheetTrigger asChild>
                <Button variant="outline" className="bg-teal-500 text-white hover:bg-teal-700 unselectable mt-4">
                    Choose word set 
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Choose word set</SheetTitle>
                    <SheetDescription>
                        Select a set of words to start learning.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[300px]">
                    <div className="grid gap-4 py-4">
                        {wordSets.map(set => (
                            <div key={set.id} className="flex justify-between">
                                <Button
                                    variant={selectedSet === set.id ? "default" : "outline"}
                                    onClick={() => {
                                        setSelectedSet(set.id);
                                        setOpenWordSets(false);
                                    }}
                                >
                                    {set.title}
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>  

        <div className="relative w-full max-w-md mt-4">
        <div className={`w-full h-48 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} rounded-lg shadow-md border border-gray-200 bg-white`}>
          <div className="absolute inset-0 flex items-center justify-center p-6 backface-hidden cursor-pointer" onClick={handleCardClick}>
            <div className="text-xl font-semibold unselectable">
              {languageSide === 'polish' ? currentCard.polish : currentCard.spanish}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-6 backface-hidden cursor-pointer rotate-y-180 bg-yellow-100 rounded-lg" onClick={handleCardClick}>
            <div className="flex flex-col items-center text-center">
              <div className="text-xl font-semibold unselectable mb-2">
                {languageSide === 'polish' ? currentCard.spanish : currentCard.polish}
              </div>
              <div className="text-sm text-gray-600 unselectable">
                {languageSide === 'polish' ? formatExample(currentCard.example).map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : ''}
              </div>
            </div>
          </div>
        </div>
       </div>


        <div className="flex gap-4 mt-4">
          <Button variant="outline" onClick={markAsDontKnow} className="bg-rose-500 text-white hover:bg-rose-700 unselectable">
            Don't know yet
          </Button>
          <Button onClick={markAsGotIt} className="bg-emerald-500 text-white hover:bg-emerald-700 unselectable">
            Got it
          </Button>
        </div>

        <div className="flex items-center mt-2 justify-around gap-8">
          <div className="flex items-center">
            <Switch id="random" checked={isRandom} onCheckedChange={setIsRandom} />
            <label htmlFor="random" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed select-none">
              Random
            </label>
          </div>
          <div className="flex items-center">
                <Switch id="language-switch" checked={languageSide === 'polish'} onCheckedChange={toggleLanguageSide} />
                <label htmlFor="language-switch" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed select-none"> {languageSide === 'polish' ? '🇵🇱 From Polish' : '🇪🇸 From Spanish'}</label>
            </div>
        </div>

        <div className="mt-4 text-gray-600">Flashcards remaining: {remainingCardsCount}/{flashcards.length}
          {remainingCardsCount > 0 && (
            <Progress className="mt-2 bg-gray-200" value={((flashcards.length - remainingCardsCount) / flashcards.length) * 100}  color="blue" />
          )}
        
        </div>
 
        <Button variant="link" onClick={resetProgress} className="mt-4">
          Reset Progress
        </Button> 
          {/* Button to clear all localStorage data */}
          {/* <Button variant="link" onClick={hardReset} className="mt-2">
              Hard Reset
          </Button> */}
          <div className="text-sm text-gray-300 unselectable">
          v0.0.1
          </div>
    </div>
    

}
