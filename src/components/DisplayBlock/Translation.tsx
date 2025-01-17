// Copyright (C) 2022  Aranggi J. Toar <at@aranggitoar.com>
// Full GPL-2.0 notice  https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt

import { Input } from '@hope-ui/solid';
import { bibleData } from 'stores/BibleDataStore';
import { setTranslatedWordFromBibleObject } from 'stores/BibleDataActions';

export default (props: Record<string, number | string>) => {
  const translation =
    bibleData.bibleObject[props.bibleBookName as string][
      props.bibleChapterIndex as number
    ][props.bibleVerseIndex as number][props.wordIndex as number][0];

  return (
    <Input
      border="1px dashed rgb(188, 186, 184)"
      borderRadius="5px"
      color="$danger11"
      css={{ direction: 'ltr' }}
      fontSize="1.05rem"
      _hover={{
        border: '1px dashed #777',
      }}
      _focus={{
        border: '1px dashed #222',
      }}
      h="1em"
      pr=".75rem"
      pl=".75rem"
      variant="unstyled"
      value={translation !== '' ? translation : ''}
      onChange={(event) =>
        setTranslatedWordFromBibleObject(
          props.wordIndex as number,
          event.currentTarget.value
        )
      }
    />
  );
};
