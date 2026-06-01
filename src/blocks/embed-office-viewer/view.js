import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import OfficeViewer from './Components/Frontend/OfficeViewer';

document.addEventListener('DOMContentLoaded', () => {
	const officeViewerBlockEls = document.querySelectorAll('.wp-block-eov-embed-office-viewer');
	officeViewerBlockEls.forEach(officeViewerBlockEl => {
		const attributes = JSON.parse(officeViewerBlockEl.dataset.attributes);

		createRoot(officeViewerBlockEl).render(<>
			<Style attributes={attributes} id={officeViewerBlockEl.id} />

			<OfficeViewer attributes={attributes} id={officeViewerBlockEl.id} />
		</>);

		officeViewerBlockEl?.removeAttribute('data-attributes');
	});
});