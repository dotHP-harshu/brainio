import React from 'react'
import type { ObjectiveQuestionInterface, SubjectiveQuestionInterface } from '../../types/types'

interface QuestionProps{
    question:ObjectiveQuestionInterface | SubjectiveQuestionInterface
}

function Question({question}:QuestionProps) {
  return (
    <div>Question</div>
  )
}

export default Question