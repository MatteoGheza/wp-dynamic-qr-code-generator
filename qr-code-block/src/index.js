import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
 
const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
};
 
registerBlockType( 'gutenberg-examples/example-01-basic-esnext', {
    apiVersion: 2,
    title: 'Example: Basic (esnext)',
    icon: 'universal-access-alt',
    category: 'design',
    example: {},
    edit() {
        const blockProps = useBlockProps( { style: blockStyle } );
 
        return (
            <div { ...blockProps }>Hello World (from the editor).</div>
        );
    },
    save() {
        const blockProps = useBlockProps.save( { style: blockStyle } );
 
        return (
            <div { ...blockProps }>
                Hello World (from the frontend).
            </div>
        );
    },
} );