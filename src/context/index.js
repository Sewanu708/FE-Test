'use client'
import React, { createContext, useState } from 'react'

export const InputContext = createContext();
function GlobalState({ children }) {
  const [input, setInput] = useState('');
  const [chatMode, setChatMode] = useState(false);
  const [chat, setChat] = useState([])
  const [highlightedText, setHighlightedText] = useState('');
  const [showCanvas, setShowCanvas] = useState(false) 
  const [canvasContent, setCanvasContent] = useState('')
  return (
    <InputContext.Provider value={{ input, showCanvas, setShowCanvas, setInput, canvasContent, setCanvasContent, chatMode, setChatMode, chat, setChat, highlightedText, setHighlightedText }}>
      {children}
    </InputContext.Provider>
  )
}

export default GlobalState