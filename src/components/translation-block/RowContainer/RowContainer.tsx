/*

Interlinear Bible Simple Editor is a multiplatform interlinear bible translation software.
Copyright (C) 2022  Aranggi J. Toar

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; only version 2 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA. 

*/

import { useContext, FC } from 'react';
import { filterDisplayedStrongsData } from 'utils/filterDisplayedStrongsData';
import { filterDisplayedOriginalLanguage } from 'utils/filterDisplayedOriginalLanguage';
import { filterDisplayedMorphologicalData } from 'utils/filterDisplayedMorphologicalData';
import { setTranslatedWordFromBibleObject, setBibleWordIndexFromBibleInfo } from 'utils/bibleDataReducerHelperFunctions';
import { BibleDataContext, useTracked } from 'contexts/BibleDataContext';
import { Container, RowContainer, TranslationInputField } from './style';

// Generate the row containers.
// Return an array of JSX Elements.
const rowContainerGenerator = (wordIndex: number): Array<JSX.Element> => {
  const { state, dispatch } = useContext(BibleDataContext);
  // const [state, dispatch] = useTracked();

  // Get every component of the current word.
  const wordComponents =
      state.bibleObject[state.bibleInfo.bibleBookName][
        state.bibleInfo.bibleChapterIndex
      ][state.bibleInfo.bibleVerseIndex][wordIndex];

  // Prepare translation index identification.
  const targetLanguageID = (`target-language-${wordIndex}`);

  // Prepare the variables to be consumed.
  const containerVariables = [
    [`1${wordIndex}`, 'strongs', filterDisplayedStrongsData(wordComponents[2])],
    [
      `2${wordIndex}`,
      'original-language',
      filterDisplayedOriginalLanguage(wordComponents[1]),
    ],
    [
      `3${wordIndex}`,
      'target-language',
      <TranslationInputField
        id={targetLanguageID}
        value={wordComponents[0]}
        onChange={(event) => {
          dispatch(setTranslatedWordFromBibleObject(wordIndex, event.target.value));
          // dispatch(setBibleWordIndexFromBibleInfo(wordIndex));
        }}
      />,
    ],
    [
      `4${wordIndex}`,
      'morphology',
      filterDisplayedMorphologicalData(wordComponents[3]),
    ],
  ];

  // Iterate the variables to be consumed into a container.
  return containerVariables.map((containerVariable) => (
    <RowContainer
      key={containerVariable[0] as unknown as string}
      className={containerVariable[1] as unknown as string}
    >
      {containerVariable[2]}
    </RowContainer>
  ));
};

// Display translation block's row container.
export const TranslationBlockRowContainer: FC<{ wordIndex: number }> = ({
  wordIndex,
}) => (
  <Container>{rowContainerGenerator(wordIndex)}</Container>
);
