"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface NavbarProps {
  aiGeneratorRef: React.RefObject<HTMLDivElement>
}

export const Navbar = ({ aiGeneratorRef }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <a
              href="https://www.own-grow.com/home-tw?utm_source=aitool&utm_medium=logo&utm_campaign=1101"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <Image
                src="https://drive.google.com/uc?export=view&id=1X9XNqxrkSKDB1aAmR3WhLrjPai7bxNso"
                alt="Own & Grow Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="http://bit.ly/48tGR1b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              聯絡我們
            </a>
            <Button
              className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white"
              onClick={() => {
                aiGeneratorRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                })
              }}
            >
              開始使用
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-8 w-8" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 px-4 bg-white border-t border-gray-100">
            <nav className="flex flex-col items-center space-y-6">
              <a
                href="http://bit.ly/48tGR1b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-800 hover:text-purple-600 transition-colors text-center"
              >
                聯絡我們
              </a>
              <button
                className="w-full py-4 px-6 text-xl text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 transition-all duration-300"
                onClick={() => {
                  aiGeneratorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                  setIsMobileMenuOpen(false);
                }}
              >
                開始使用
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}